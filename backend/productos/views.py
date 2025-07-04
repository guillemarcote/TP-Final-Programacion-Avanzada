from rest_framework import viewsets
from .models import Producto
from .serializers import ProductoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Producto

@api_view(['POST'])
def comprar_productos(request):
    carrito = request.data  # lista de productos con id y cantidad
    errores = []

    for item in carrito:
        producto_id = item.get('id')
        cantidad = item.get('cantidad', 1)

        try:
            producto = Producto.objects.get(id=producto_id)

            if producto.stock >= cantidad:
                producto.stock -= cantidad
                producto.save()
            else:
                errores.append(f"Stock insuficiente para {producto.nombre}")
        except Producto.DoesNotExist:
            errores.append(f"Producto no encontrado con id {producto_id}")

    if errores:
        return Response({'errores': errores}, status=400)

    return Response({'mensaje': 'Compra procesada correctamente'}, status=200)
