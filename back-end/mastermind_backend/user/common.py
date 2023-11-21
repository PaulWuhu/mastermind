from json import JSONEncoder
from django.db.models import QuerySet

class QuerySetEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, QuerySet):
            return list(o)
        else:
            return super().default(o)

class ModelEncoder(QuerySetEncoder, JSONEncoder):
    encoders = {}

    def default(self, object):
        if isinstance(object, self.model):
            d = {}
            for property in self.properties:
                value = getattr(object, property)
                if property in self.encoders:
                    encoder = self.encoders[property]
                    value = encoder.default(value)
                d[property] = value
            return d
        else:
            return super().default(object)
