from django.shortcuts import render, get_object_or_404, redirect
from products.models import Product
from .models import Cart, CartItem
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@require_POST
@csrf_exempt
def cart_add(request, product_id):
    cart_id = request.session.get('cart_id')
    
    if cart_id:
        try:
            cart = Cart.objects.get(id=cart_id)
        except Cart.DoesNotExist:
            cart = Cart.objects.create()
    else:
        cart = Cart.objects.create()
        request.session['cart_id'] = cart.id
    
    product = get_object_or_404(Product, id=product_id)
    
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    
    if not created:
        cart_item.quantity += 1
    
    cart_item.save()
    
    response_data = {
        "success": True,
        "message": f'Added {product.name} to cart',
        "cart_count": cart.items.count()
    }
    
    return JsonResponse(response_data)

def cart_detail(request):
    cart_id = request.session.get('cart_id')
    cart = None
    
    if cart_id:
        try:
            cart = Cart.objects.get(id=cart_id)
        except Cart.DoesNotExist:
            cart = None
    
    # Check if this is an API request (JSON response expected)
    if request.headers.get('Accept') == 'application/json' or request.path.startswith('/api/'):
        if cart and cart.items.exists():
            cart_data = {
                'id': cart.id,
                'items': [
                    {
                        'id': item.id,
                        'product': {
                            'id': item.product.id,
                            'name': item.product.name,
                            'price': str(item.product.price),
                            'image': item.product.image.url if item.product.image else None,
                        },
                        'quantity': item.quantity,
                        'total_price': str(item.get_total_price())
                    }
                    for item in cart.items.all()
                ],
                'total_price': str(cart.get_total_price()) if hasattr(cart, 'get_total_price') else '0.00'
            }
        else:
            cart_data = {'items': [], 'total_price': '0.00'}
        
        return JsonResponse(cart_data)
    
    # HTML response for Django templates
    if not cart or not cart.items.exists():
        cart = None
    
    return render(request, "cart/detail.html", {"cart": cart})

@require_POST
@csrf_exempt
def cart_remove(request, product_id):
    cart_id = request.session.get('cart_id')
    
    if not cart_id:
        return JsonResponse({'success': False, 'error': 'No cart found'})
    
    try:
        cart = Cart.objects.get(id=cart_id)
        item = CartItem.objects.get(id=product_id, cart=cart)
        item.delete()
        
        # Check if this is an API request
        if request.headers.get('Accept') == 'application/json' or request.path.startswith('/api/'):
            return JsonResponse({
                'success': True,
                'message': 'Item removed from cart',
                'cart_count': cart.items.count()
            })
        
        return redirect("cart:cart_detail")
        
    except (Cart.DoesNotExist, CartItem.DoesNotExist):
        if request.headers.get('Accept') == 'application/json' or request.path.startswith('/api/'):
            return JsonResponse({'success': False, 'error': 'Item not found'})
        
        return redirect("cart:cart_detail")

@csrf_exempt
def cart_update_quantity(request, item_id):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Method not allowed'})
    
    try:
        data = json.loads(request.body)
        quantity = int(data.get('quantity', 1))
        
        cart_id = request.session.get('cart_id')
        if not cart_id:
            return JsonResponse({'success': False, 'error': 'No cart found'})
        
        cart = Cart.objects.get(id=cart_id)
        item = CartItem.objects.get(id=item_id, cart=cart)
        
        if quantity <= 0:
            item.delete()
        else:
            item.quantity = quantity
            item.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Cart updated',
            'cart_count': cart.items.count()
        })
        
    except (Cart.DoesNotExist, CartItem.DoesNotExist):
        return JsonResponse({'success': False, 'error': 'Item not found'})
    except (ValueError, json.JSONDecodeError):
        return JsonResponse({'success': False, 'error': 'Invalid data'})
