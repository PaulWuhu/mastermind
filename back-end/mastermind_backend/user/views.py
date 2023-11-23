from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from .common import ModelEncoder
from .acls import get_random_number_from_api
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


class UserListEncoder(ModelEncoder):
    model = User
    properties = ["username", "win", "loss"]


class UserEncoder(ModelEncoder):
    model = User
    properties = ["username"]


# Create your views here.
@api_view(["GET"])
def get_random_number(request):
    response = get_random_number_from_api()
    res = JsonResponse(response, safe=False)
    return res


@require_http_methods(["POST"])
def log_in(request):
    try:
        content = json.loads(request.body)
    except json.JSONDecodeError:
        return 400, {"message": "Bad JSON"}, None
    username = content["username"]
    password = content["password"]
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        response = JsonResponse({"message": "does not have this user"}, status=404)
        return response
    check_pass = user.password
    password_check = check_password(password, check_pass)
    if password_check:
        refresh = RefreshToken.for_user(user)
        token = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        data = {"token": token, "user": user}
        return JsonResponse(data, UserListEncoder, status=200)
    else:
        response = JsonResponse({"message": "wrong password"}, status=403)
        return response


@api_view(["POST"])
def signup(request):
    try:
        content = json.loads(request.body)
    except json.JSONDecodeError:
        return 400, {"message": "Bad JSON"}, None
    username = content["username"]
    user = User.objects.filter(username=username)
    if user:
        return JsonResponse({"message": "user already exist"}, status=400)
    try:
        content["password"] = make_password(content["password"])
        account = User.objects.create(**content)
        return log_in(request)
    except ValueError as e:
        return 400, {"message": str(e)}, None


@api_view(["GET", "DELETE"])
@permission_classes([IsAuthenticated])
def api_get_user(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        response = JsonResponse({"message": "does not have this user"})
        response.status_code = 404
        return response
    if request.method == "GET":
        return JsonResponse(
            user,
            UserListEncoder,
            safe=False,
        )
    else:
        count, _ = User.objects.filter(username=username).delete()
        return JsonResponse({"deleted": count > 0})


@api_view(["GET"])
def api_get_all_user(request):
    try:
        users = User.objects.all()
        response = JsonResponse(users, UserListEncoder, safe=False)
        return response
    except:
        return JsonResponse(
            {"message": "something went wrong"},
            status=400,
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def api_score(request, username):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        response = JsonResponse({"message": "does not have this user"})
        response.status_code = 404
        return response
    content = json.loads(request.body)
    if "result" in content:
        User.objects.get(username=username)
        if content["result"] == "win":
            user.win += 1
            user.save()
        elif content["result"] == "loss":
            user.loss += 1
            user.save()
        else:
            response = JsonResponse({"message": "BAD JSON"})
            response.status_code = 400
            return response
        return JsonResponse(user, UserListEncoder, safe=False)
    else:
        response = JsonResponse({"message": "BAD JSON"})
        response.status_code = 400
        return response


# logout view to be tried, and we can do it by blacklist the tokens.
