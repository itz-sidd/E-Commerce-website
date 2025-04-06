from django.contrib import admin
from .models import Order,OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    rae_id_fields = ["products"]

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id","full_name","email"]
    inline = [OrderItemInline]
    readonly_fields=("created_at",)
