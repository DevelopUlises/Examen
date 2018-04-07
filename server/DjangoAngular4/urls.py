from django.conf import settings
from django.conf.urls import url,include
from django.contrib import admin
from django.conf.urls.static import static
from rest_framework import routers
from django.views.generic.base import TemplateView
from users import views


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^django-admin/', include(admin.site.urls)),
    url(r'^api/verify',views.verify, name='verify'),
    url(r'^api/',include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^', include('django.contrib.auth.urls')),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += [
    url(r'^.*', TemplateView.as_view(template_name="index.html",), name='home'),
]