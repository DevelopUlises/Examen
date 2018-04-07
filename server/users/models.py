from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError("Los usuarios deben tener un email")

        if not first_name:
            raise ValueError("Debes especificar el nombre del usuario")

        if not last_name:
            raise ValueError("Debes especificar el apellido del usuario")

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


choice_user_role = (
    ('Admin','Admin'),
    ('Operator','Operator')
)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField("email", unique=True)
    first_name = models.CharField("first name", max_length=50)
    last_name = models.CharField("last name", max_length=50)
    contact_phone = models.CharField("contact phone", max_length=50)
    locale_city = models.CharField(max_length=150)
    locale_country = models.CharField(max_length=100)
    locale_address = models.CharField(max_length=100)
    cdi = models.CharField(max_length=100,blank=True,null=True,unique=True)
    is_staff = models.BooleanField("is staff", default=False)
    is_active = models.BooleanField("active", default=True)
    role = models.CharField(max_length=10,choices=choice_user_role,default='Admin')
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    class Meta:
        verbose_name = u"usuario"
        verbose_name_plural = u"usuarios"



# This code is triggered whenever a new user has been created and saved to the database
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)