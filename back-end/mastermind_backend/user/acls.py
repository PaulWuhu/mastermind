import requests


def get_random_number_from_api():
    # API endpoint
    api_url = "https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new"
    response = requests.get(api_url)
    if response.status_code == 200:
        # print(response.text)
        # upon looking at the result of response.text, I realize the shape of response is [# "4",  "\n", "6", "\n","1","\n","0","\n"]. So I used a for loop to get rid of the \n and make sure the data is clean
        result = []
        for i in response.text:
            if i == "\n":
                pass
            else:
                result.append(i)
        return result
    else:
        return {"error": response.text}
