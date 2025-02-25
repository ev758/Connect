from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("", views.connect),
    path("tokens/", views.Tokens.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()), #refreshes access token
    path("create-account/", views.CreateAccount.as_view()),
    path("forgot-password/", views.ForgotPasswordEmail.as_view()),
    path("forgot-password/password-reset/", views.PasswordReset.as_view()),
    path("profile/", views.Profile.as_view()),
    path("profile/update/", views.Profile.as_view()),
    path("profile/delete/", views.Profile.as_view()),
    path("user-list/<str:user>/", views.UserList.as_view()),
    path("friend-request/add-friend/<int:receiver_id>/", views.FriendRequest.as_view()),
    path("friend-request/pending/list/", views.FriendRequestList.as_view()),
    path("friend-request/option/", views.FriendOption.as_view()),
    path("friend-status/<int:user_id>/<int:user_id2>/", views.FriendStatus.as_view()),
    path("friends-list/", views.FriendsList.as_view()),
    path("friends-list/remove-friend/<int:user_id>/<int:user_id2>/", views.RemoveFriend.as_view()),
    path("messages/list/<str:chat_name>/", views.MessagesList.as_view()),
    path("messages/send-message/", views.SendMessage.as_view()),
    path("messages/latest-message/list/", views.LatestMessageList.as_view()),
    path("messages/friend-names/list/", views.FriendNamesList.as_view())
]