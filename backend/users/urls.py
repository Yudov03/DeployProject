from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import * 

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register('patients', PatientViewset, basename='patients')
router.register('staffs', StaffViewset, basename='staffs')
router.register('medicines', MedicineViewset, basename='medicines')
router.register('device', DeviceViewset, basename='device')
router.register('schedule', ScheduleViewset, basename='schedule')
router.register('appointments', AppointmentViewset, basename='appointments')
router.register('maintainandrepair', MaintainAndRepairViewset, basename='maintainandrepair')
urlpatterns = router.urls