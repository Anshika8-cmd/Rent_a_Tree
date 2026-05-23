from django.db import models
from django.conf import settings
import random
import string


def generate_tree_code(tree_type):
    prefix = "TREE"
    type_part = tree_type[:2].upper() if tree_type else "TR"
    random_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"{prefix}{random.randint(10,99)}{type_part}{random_part}"


class Tree(models.Model):
    CATEGORY_CHOICES = (
        ('Fruit', 'Fruit'),
        ('Indoor', 'Indoor'),
        ('Outdoor', 'Outdoor'),
        ('Decorative', 'Decorative'),
        ('Event', 'Event'),
        ('Medicinal', 'Medicinal'),
    )

    TIER_CHOICES = (
        ('Base', 'Base'),
        ('Standard', 'Standard'),
        ('Premium', 'Premium'),
    )

    tree_code = models.CharField(max_length=30, unique=True, blank=True)
    name = models.CharField(max_length=150)
    tree_type = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    tier = models.CharField(max_length=50, choices=TIER_CHOICES)
    price = models.IntegerField()
    token_amount = models.IntegerField(default=2000)
    image = models.ImageField(upload_to='trees/')
    short_description = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=150, blank=True, null=True)
    height = models.CharField(max_length=50, blank=True, null=True)
    care_level = models.CharField(max_length=50, default="Easy")
    available = models.BooleanField(default=True)
    stock = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.tree_code:
            code = generate_tree_code(self.tree_type)
            while Tree.objects.filter(tree_code=code).exists():
                code = generate_tree_code(self.tree_type)
            self.tree_code = code
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.tree_code}"


class TreeImage(models.Model):
    tree = models.ForeignKey(Tree, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='tree_gallery/')

    def __str__(self):
        return self.tree.name


class Booking(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tree = models.ForeignKey(Tree, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Pending')
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.tree.name}"


class CartItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tree = models.ForeignKey(Tree, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'tree')

    def __str__(self):
        return f"{self.user.username} - {self.tree.name}"


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tree = models.ForeignKey(Tree, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    photo = models.ImageField(upload_to='reviews/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username}"


class Blog(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='blogs/', blank=True, null=True)
    short_description = models.CharField(max_length=255)
    content = models.TextField()
    published_date = models.DateField()
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title