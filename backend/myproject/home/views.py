from django.http import JsonResponse
from tests.frequency_test import FrequencyTest  # Adjust the import path accordingly
from tests.runs_test import RunTest  # Adjust the import path accordingly
from tests.approximate_entropy_test import ApproximateEntropy
from tests.linear_complexity_test import ComplexityTest
from tests.template_matching_test import TemplateMatching
from tests.universal_test import Universal
from tests.serial_test import Serial
from tests.cumulative_sums_test import CumulativeSums
from tests. random_excursions_test import RandomExcursions
from tests.Matrix import Matrix
from tests.spectral import SpectralTest
from django.http import StreamingHttpResponse
import mimetypes
#streaming
import base64
import time
import requests
from django.http import StreamingHttpResponse
from django.shortcuts import render





def run_frequency_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the monobit_test method from the FrequencyTest class
    p_value, result = FrequencyTest.monobit_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result == 1:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)
def run_frequency_block_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = FrequencyTest.block_frequency(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)


def run_runs_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = RunTest.run_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)


def run_longest_one_block_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = RunTest.longest_one_block_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)

def run_approximate_entropy_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = ApproximateEntropy.approximate_entropy_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)

def run_linear_complexity_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = ComplexityTest.linear_complexity_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)

def run_non_overlapping_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = TemplateMatching.non_overlapping_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)



def run_overlapping_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = TemplateMatching.overlapping_patterns(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)


def run_statistical_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = Universal.statistical_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)


def run_serial_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = Serial.serial_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)



def run_cumulative_sums_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = CumulativeSums.cumulative_sums_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)


def run_random_excursions_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')
   
    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    chi_sq, p_value, result = RandomExcursions.random_excursions_test(binary_data)

    print("chi^2:", chi_sq)
    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'chi^2': chi_sq,
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)

def random_excursions_variant_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    chi_sq, p_value, result = RandomExcursions.variant_test(binary_data)

    print("chi^2:", chi_sq)
    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'chi^2': chi_sq,
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)


def run_binary_matrix_rank_text(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = Matrix.binary_matrix_rank_text(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)


def run_spectral_test(request):
    # Example binary data received from the request query parameters
    binary_data = request.GET.get('binary_data', '')

    # Print the request URL and parameters
    print("Request URL:", request.get_full_path())
    print("Request Parameters:", request.GET)

    # Call the block_frequency method
    p_value, result = SpectralTest.spectral_test(binary_data)

    print("p_value:", p_value)
    print("Result:", result)
    
    # Prepare the response data
    if result:
        result_text = "random number"
    else:
        result_text = "non-random number"
        
    response_data = {
        'p_value': p_value,
        'result': result_text
    }

    return JsonResponse(response_data)


def send_binary_data(request):
    binary_data = '101010'  # Example binary data as a string
    response_data = {
        'binary_data': binary_data
    }
    return JsonResponse(response_data)

def fetch_binary_data():
    # Replace this URL with the actual URL of the external server
    url = "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new"
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for HTTP errors
    return response.content

def binary_event_stream():
    while True:
        try:
            binary_data = fetch_binary_data()
            encoded_data = base64.b64encode(binary_data).decode('utf-8')
            yield f'data: {encoded_data}\n\n'
        except requests.RequestException as e:
            yield f'data: Error fetching data: {e}\n\n'
        time.sleep(0.5)  # Adjust the sleep time as needed

def sse_binary_view(request):
    response = StreamingHttpResponse(binary_event_stream(), content_type='text/event-stream')
    response['Cache-Control'] = 'no-cache'
    response['X-Accel-Buffering'] = 'no'  # Disable buffering for nginx
    return response

def sse_binary_example_view(request):
    return render(request, 'myapp/sse_binary_example.html')