from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("", views.connect),
    path("tokens/", views.Tokens.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()), #refreshes access token
    path("create-account/", views.CreateAccount.as_view()),
    path("profile/", views.Profile.as_view()),
    path("profile/update/", views.Profile.as_view()),
    path("profile/delete/", views.Profile.as_view()),
]