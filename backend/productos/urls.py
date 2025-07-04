from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, comprar_productos

router = DefaultRouter()
router.register(r'productos', ProductoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('comprar/', comprar_productos), 
]
