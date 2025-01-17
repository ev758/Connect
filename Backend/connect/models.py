from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

#custom UserManager
class UserManager(BaseUserManager):
    #overrides create_user method
    def create_user(self, first_name, email, username, password, last_name=""):
        if not first_name:
            raise ValueError("First name must be entered")
        if not email:
            raise ValueError("Email must be entered")
        if not username:
            raise ValueError("Username must be entered")
        if not password:
            raise ValueError("Password must be entered")
        
        #lowercases email domains and removes extra spaces
        email = self.normalize_email(email)

        user = self.model(first_name=first_name, last_name=last_name, email=email, username=username)
        user.set_password(password)
        user.save()

        return user

#custom User model
class User(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(max_length=150, unique=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=150)

    USERNAME_FIELD = 'email'

    #links custom UserManager to custom User
    objects = UserManager()