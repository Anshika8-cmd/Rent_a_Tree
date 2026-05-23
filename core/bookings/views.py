from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import Tree, Booking, CartItem, Review, Blog
from .serializers import TreeSerializer, BookingSerializer, CartItemSerializer, ReviewSerializer, BlogSerializer
from rest_framework.permissions import IsAdminUser




@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard_stats(request):
    return Response({
        "total_trees": Tree.objects.count(),
        "available_trees": Tree.objects.filter(available=True).count(),
        "total_bookings": Booking.objects.count(),
        "pending_bookings": Booking.objects.filter(status="Pending").count(),
        "confirmed_bookings": Booking.objects.filter(status="Confirmed").count(),
        "cancelled_bookings": Booking.objects.filter(status="Cancelled").count(),
    })


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_all_bookings(request):
    bookings = Booking.objects.all().order_by("-booked_at")
    serializer = BookingSerializer(bookings, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def admin_update_booking_status(request, pk):
    booking = Booking.objects.get(id=pk)
    booking.status = request.data.get("status", booking.status)
    booking.save()

    serializer = BookingSerializer(booking, context={"request": request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def all_trees(request):
    trees = Tree.objects.filter(available=True).order_by('-created_at')

    search = request.GET.get('search')
    category = request.GET.get('category')
    tier = request.GET.get('tier')

    if search:
        trees = trees.filter(name__icontains=search)

    if category:
        trees = trees.filter(category__iexact=category)

    if tier:
        trees = trees.filter(tier__iexact=tier)

    serializer = TreeSerializer(trees, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def tree_detail(request, pk):
    tree = Tree.objects.get(id=pk)
    serializer = TreeSerializer(tree, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    tree = Tree.objects.get(id=request.data.get('tree'))

    booking = Booking.objects.create(
        user=request.user,
        tree=tree,
        customer_name=request.data.get('customer_name'),
        phone=request.data.get('phone'),
        address=request.data.get('address')
    )

    serializer = BookingSerializer(booking, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookings(request):
    bookings = Booking.objects.filter(user=request.user).order_by('-booked_at')
    serializer = BookingSerializer(bookings, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    tree = Tree.objects.get(id=request.data.get('tree'))
    item, created = CartItem.objects.get_or_create(user=request.user, tree=tree)
    serializer = CartItemSerializer(item, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_cart(request):
    cart = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(cart, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_cart_item(request, pk):
    CartItem.objects.filter(id=pk, user=request.user).delete()
    return Response({"message": "Removed from cart"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_review(request):
    tree = Tree.objects.get(id=request.data.get('tree'))

    review = Review.objects.create(
        user=request.user,
        tree=tree,
        rating=request.data.get('rating', 5),
        comment=request.data.get('comment'),
        photo=request.FILES.get('photo')
    )

    serializer = ReviewSerializer(review, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def all_blogs(request):
    blogs = Blog.objects.filter(published=True).order_by('-created_at')
    serializer = BlogSerializer(blogs, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def blog_detail(request, pk):
    blog = Blog.objects.get(id=pk)
    serializer = BlogSerializer(blog, context={'request': request})
    return Response(serializer.data)