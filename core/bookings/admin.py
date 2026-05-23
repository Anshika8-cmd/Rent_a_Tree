from django.contrib import admin
from .models import Tree, TreeImage, Booking, CartItem, Review, Blog


class TreeImageInline(admin.TabularInline):
    model = TreeImage
    extra = 3


@admin.register(Tree)
class TreeAdmin(admin.ModelAdmin):
    list_display = ('name', 'tree_code', 'tree_type', 'category', 'tier', 'price', 'available', 'stock')
    list_filter = ('category', 'tier', 'available')
    search_fields = ('name', 'tree_type', 'tree_code')
    readonly_fields = ('tree_code',)
    inlines = [TreeImageInline]


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'tree', 'phone', 'status', 'booked_at')
    list_filter = ('status',)
    search_fields = ('customer_name', 'phone', 'tree__name', 'tree__tree_code')


admin.site.register(CartItem)
admin.site.register(Review)
admin.site.register(Blog)