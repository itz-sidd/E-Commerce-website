from django.shortcuts import render, redirect, get_object_or_404
from cart.models import Cart
from .forms import OrderCreateForm
from .models import OrderItem, Order
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def order_create(request):
    if request.method == "POST":
        # Check if this is an API request (JSON)
        if request.content_type == 'application/json':
            try:
                data = json.loads(request.body)
                return create_order_from_api(request, data)
            except json.JSONDecodeError:
                return JsonResponse({'success': False, 'error': 'Invalid JSON data'})
        
        # Traditional Django form submission
        cart = None
        cart_id = request.session.get('cart_id')
        
        if cart_id:
            try:
                cart = Cart.objects.get(id=cart_id)
            except Cart.DoesNotExist:
                cart = None

        if not cart or not cart.items.exists():
            return redirect("cart:cart_detail")

        form = OrderCreateForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.save()

            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    price=item.product.price,
                    quantity=item.quantity
                )

            cart.delete()
            del request.session["cart_id"]
            return redirect("orders:order_confirmation", order.id)
    else:
        # GET request - show the form
        cart = None
        cart_id = request.session.get('cart_id')
        
        if cart_id:
            try:
                cart = Cart.objects.get(id=cart_id)
            except Cart.DoesNotExist:
                cart = None

        if not cart or not cart.items.exists():
            return redirect("cart:cart_detail")
            
        form = OrderCreateForm()

    return render(request, "orders/order_create.html", {
        "cart": cart,
        "form": form
    })

def create_order_from_api(request, data):
    """Handle order creation from React frontend API call"""
    try:
        # Get cart from session
        cart_id = request.session.get('cart_id')
        cart = None
        
        if cart_id:
            try:
                cart = Cart.objects.get(id=cart_id)
            except Cart.DoesNotExist:
                pass
        
        # Create order
        order = Order.objects.create(
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', ''),
            email=data.get('email', ''),
            address=data.get('address', ''),
            postal_code=data.get('postal_code', ''),
            city=data.get('city', '')
        )
        
        # Add items to order
        if cart and cart.items.exists():
            # Use items from Django cart
            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    price=item.product.price,
                    quantity=item.quantity
                )
            
            # Clear the cart
            cart.delete()
            if 'cart_id' in request.session:
                del request.session["cart_id"]
        else:
            # Use items from frontend data (fallback)
            from products.models import Product
            
            items_data = data.get('items', [])
            for item_data in items_data:
                try:
                    product = Product.objects.get(id=item_data['product_id'])
                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        price=item_data.get('price', product.price),
                        quantity=item_data.get('quantity', 1)
                    )
                except Product.DoesNotExist:
                    continue
        
        return JsonResponse({
            'success': True,
            'order_id': order.id,
            'message': 'Order created successfully'
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': f'Failed to create order: {str(e)}'
        })

def order_confirmation(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    
    # Check if this is an API request
    if request.headers.get('Accept') == 'application/json' or request.path.startswith('/api/'):
        order_data = {
            'id': order.id,
            'first_name': order.first_name,
            'last_name': order.last_name,
            'email': order.email,
            'address': order.address,
            'city': order.city,
            'postal_code': order.postal_code,
            'created': order.created.isoformat(),
            'updated': order.updated.isoformat(),
            'items': [
                {
                    'product': {
                        'id': item.product.id,
                        'name': item.product.name,
                    },
                    'price': str(item.price),
                    'quantity': item.quantity,
                    'total': str(item.get_cost())
                }
                for item in order.items.all()
            ],
            'total': str(order.get_total_cost())
        }
        return JsonResponse(order_data)
    
    return render(request, "orders/order_confirmation.html", {"order": order})
