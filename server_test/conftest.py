import pytest

import os
import time
import socket
from urllib.parse import urlparse


def is_port_open(hostname, port):
    return socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect_ex((hostname, port)) == 0


@pytest.fixture(scope="session")
def ENDPOINT():
    return os.environ.get('URI_SERVER', 'http://localhost:8000')


@pytest.fixture(scope="session", autouse=True)
def wait_for_service(ENDPOINT):
    """
    Before starting tests
    Wait for service to become available
    """
    _endpoint = urlparse(ENDPOINT)
    for attempt in range(10):
        try:
            if is_port_open(_endpoint.hostname, _endpoint.port):
                return
        except Exception as ex:
            pass
        time.sleep(1)
    raise Exception(f"{ENDPOINT} port is not active")  # TODO: This does not seem to stop execution of tests?
    #request.addfinalizer(finalizer_function)


