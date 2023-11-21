from django.urls import path
from . import views

urlpatterns = [
    path("api/get_random_numbers", views.get_random_number, name="get_random_number"),
    path("api/get_all_user",views.api_get_all_user, name="api_get_all_user"),
    path(
        "api/get_user/<str:username>/",
        views.api_get_user,
        name="api_get_user",
    ),
    path(
        "api/user/signup/",
        views.signup,
        name="signup",
    ),
        path(
        "api/score/<str:username>/",
        views.api_score,
        name="score",
    ),
        path(
        "api/login/",
        views.log_in,
        name="login",
    ),
]
