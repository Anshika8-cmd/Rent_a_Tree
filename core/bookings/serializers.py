from rest_framework import serializers
from .models import Tree, TreeImage, Booking, CartItem, Review, Blog


class TreeImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = TreeImage
        fields = ['id', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['user']

    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)
        return None


class TreeSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    gallery = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Tree
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

    def get_gallery(self, obj):
        return TreeImageSerializer(
            obj.images.all(),
            many=True,
            context=self.context
        ).data


class BookingSerializer(serializers.ModelSerializer):
    tree_name = serializers.CharField(source='tree.name', read_only=True)
    tree_code = serializers.CharField(source='tree.tree_code', read_only=True)
    tree_image = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['user', 'status']

    def get_tree_image(self, obj):
        request = self.context.get('request')
        if obj.tree.image and request:
            return request.build_absolute_uri(obj.tree.image.url)
        return None


class CartItemSerializer(serializers.ModelSerializer):
    tree = TreeSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None