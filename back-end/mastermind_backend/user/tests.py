from django.test import TestCase
from .models import User
from rest_framework import status
from django.urls import reverse
import json
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password


class my_test(TestCase):
    def setUp(self):
        self.user_data = {
            "username": "testuser",
            "password": make_password("testpassword"),
        }

        self.user = User.objects.create(**self.user_data)
        refresh = RefreshToken.for_user(self.user)
        self.token = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

    def test_signup(self):
        url = reverse("signup")
        response = self.client.post(
            url,
            {"username": "test22", "password": "password"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_signup_two_user(self):
        url = reverse("signup")
        response = self.client.post(
            url,
            {"username": "testuser", "password": "testpassword"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertTrue("message" in response.json())

    def test_get_random_number(self):
        url = reverse("get_random_number")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login(self):
        response = self.client.post(
            "/user/api/login/",
            {"username": "testuser", "password": "testpassword"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("token" in response.json())
        self.assertTrue("user" in response.json())

    def test_login_fail_no_user(self):
        response = self.client.post(
            "/user/api/login/",
            {"username": "tester", "password": "testpassword"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)

    def test_login_fail_no_user(self):
        response = self.client.post(
            "/user/api/login/",
            {"username": "testuser", "password": "testssword"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 403)

    def test_api_get_user(self):
        url = reverse("api_get_user", args=["testuser"])
        response = self.client.get(
            url,
            HTTP_AUTHORIZATION=f'Bearer {self.token["access"]}',
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("username" in response.json())

    def test_api_get_user_fail(self):
        url = reverse("api_get_user", args=["tesuser"])
        response = self.client.get(
            url,
            HTTP_AUTHORIZATION=f'Bearer {self.token["access"]}',
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)
        self.assertTrue("message" in response.json())

    def test_api_get_all_user(self):
        url = reverse("api_get_all_user")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("username" in response.json()[0])
        self.assertTrue("win" in response.json()[0])
        self.assertTrue("loss" in response.json()[0])

    def test_api_score(self):
        url = reverse("score", args=["testuser"])
        data = {"result": "win"}
        response = self.client.put(
            url,
            json.dumps(data),
            content_type="application/json",
            HTTP_AUTHORIZATION=f'Bearer {self.token["access"]}',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("username" in response.json())
