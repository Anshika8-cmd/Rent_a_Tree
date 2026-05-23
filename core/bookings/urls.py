from django.urls import path
from .views import *

urlpatterns = [
    path('trees/', all_trees),
    path('trees/<int:pk>/', tree_detail),

    path('create/', create_booking),
    path('my-bookings/', my_bookings),

    path('cart/add/', add_to_cart),
    path('cart/', my_cart),
    path('cart/remove/<int:pk>/', remove_cart_item),

    path('reviews/add/', add_review),

    path('blogs/', all_blogs),
    path('blogs/<int:pk>/', blog_detail),

path('admin/dashboard-stats/', admin_dashboard_stats),
path('admin/bookings/', admin_all_bookings),
path('admin/bookings/<int:pk>/status/', admin_update_booking_status),
]