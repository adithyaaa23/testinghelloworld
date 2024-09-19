
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import DeviceForm
# Create your views here.
from .models import Device
def get_device(request):
    devices=list(Device.objects.values())
    return JsonResponse(devices,safe=False)
def add_device(request):
    if request.method == 'POST':
        form = DeviceForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/api/devices/')  
    else:
        form = DeviceForm()
    return render(request, 'add_device.html', {'form': form})
def device_list(request):
    devices = Device.objects.all()
    return render(request, 'device_list.html', {'devices': devices})