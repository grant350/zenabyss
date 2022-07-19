# content of test_class.py
import collections
try:
    collections = collections.abc
except AttributeError:
    collections = collections

class TestClass:
    def test_one(self):
        x = "this"
        assert "h" in x

    def test_two(self):
        x = "hello"
        assert x == "hello"