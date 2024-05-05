from rest_framework import serializers 
from .models import * 
from django.contrib.auth import get_user_model 
User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret


class RegisterSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ('id','email','password')
        extra_kwargs = { 'password': {'write_only':True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
#######################
class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'address', 'phone', 'dayofbirth', 'gender', 'mail']

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['id', 'name', 'address', 'phone', 'dayofbirth', 'gender', 'certificate', 'specialty', 'mail', 'position', 'academicrank', 'specialtylevel']

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['id', 'name', 'expiry', 'imp', 'exp', 'description']

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name', 'status', 'available', 'description']
    
class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['id', 'name', 'date', 'start', 'end']
    
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'time', 'date', 'patientname', 'doctorname', 'feestatus', 'completed','diagnosis', 'rate']

class MaintainAndRepairSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintainAndRepair
        fields = ['id', 'date', 'type', 'detail', 'name']