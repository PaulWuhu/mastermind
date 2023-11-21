
from django.test import TestCase
from .models import User
from rest_framework import status
from django.urls import reverse
import json
from rest_framework_simplejwt.tokens import RefreshToken



class my_test(TestCase):
    def setUp(self):
        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword',
        }
        self.signup_data = {
            'username': 'newuser',
            'password': 'newpassword',
        }

        self.user = User.objects.create(**self.user_data)
        refresh = RefreshToken.for_user(self.user)
        self.token = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

    # def test_signup(self):
    #     url = '/user/api/user/signup/'
    #     data = self.signup_data
    #     response = self.client.post(url, data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     print(response)

    def test_get_random_number(self):
        url = reverse("get_random_number")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login(self):
        response = self.client.post('/user/api/login/', {
            'username': 'testuser',
            'password': 'testpassword',
        }, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)
        self.assertTrue('user' in response.data)

    def test_api_get_user(self):
        url = f'/api/get_user/{self.user_data["username"]}/'
        response = self.client.get(url, HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('username' in response.data)

    def test_api_get_all_user(self):
        url = reverse("api_get_all_user")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('username' in response.json()[0])
        self.assertTrue('win' in response.json()[0])
        self.assertTrue('loss' in response.json()[0])

    def test_api_score(self):
        url = f'/api/score/{self.user_data["username"]}/'
        data = {'result': 'win'}
        response = self.client.put(url, json.dumps(data), content_type='application/json', HTTP_AUTHORIZATION=f'Bearer {self.token}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('username' in response.data)
