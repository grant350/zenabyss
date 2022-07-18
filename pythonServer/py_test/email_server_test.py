# content of test_class.py
import collections
try:
    collectionsAbc = collections.abc
except AttributeError:
    collectionsAbc = collections

class TestClass:
    def test_one(self):
        x = "this"
        assert "h" in x

    def test_two(self):
        x = "hello"
        assert x == "hello"