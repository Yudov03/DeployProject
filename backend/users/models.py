from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.utils.html import strip_tags
from django.utils.translation import gettext_lazy as _
from datetime import date
from datetime import datetime
# Create your models here.

class CustomUserManager(BaseUserManager): 
    def create_user(self, email, password=None, **extra_fields ): 
        if not email: 
            raise ValueError('Email is a required field')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email, password=None, **extra_fields): 
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(max_length=200, unique=True)
    birthday = models.DateField(null=True, blank=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token, *args, **kwargs):
    sitelink = "http://localhost:5173/"
    token = "{}".format(reset_password_token.key)
    full_link = str(sitelink)+str("password-reset/")+str(token)

    print(token)
    print(full_link)

    context = {
        'full_link': full_link,
        'email_adress': reset_password_token.user.email
    }

    html_message = render_to_string("backend/email.html", context=context)
    plain_message = strip_tags(html_message)

    msg = EmailMultiAlternatives(
        subject = "Request for resetting password for {title}".format(title=reset_password_token.user.email), 
        body=plain_message,
        from_email = "sender@example.com", 
        to=[reset_password_token.user.email]
    )

    msg.attach_alternative(html_message, "text/html")
    msg.send()

#####################
class Patient(models.Model):
    name = models.TextField(max_length=200, unique=False)
    dayofbirth = models.DateField(default=date.today)
    phone = models.CharField(max_length=11, unique=True)
    address = models.TextField(max_length=200, unique=False)
    class GenderChoices(models.TextChoices):
        MALE = "M", _("Male")
        FEMALE = "F", _("Female")
        OTHER = "O", _("Other")
    gender = models.CharField(max_length=1, choices=GenderChoices, default=GenderChoices.OTHER)
    mail = models.EmailField(max_length=200, default="123@gmail.com")

class Staff(models.Model):
    name = models.TextField(max_length=200, unique=False)
    dayofbirth = models.DateField(default=date.today)
    phone = models.CharField(max_length=11, unique=True)
    address = models.TextField(max_length=200, unique=False)
    class GenderChoices(models.TextChoices):
        MALE = "M", _("Male")
        FEMALE = "F", _("Female")
        OTHER = "O", _("Other")
    gender = models.CharField(max_length=1, choices=GenderChoices, default=GenderChoices.OTHER)
    certificate = models.TextField(max_length=200, unique=False)
    academicrank= models.TextField(max_length=200, unique=False, default="")
    specialty = models.TextField(max_length=200, unique=False)
    specialtylevel = models.TextField(max_length=200, unique=False, default="")
    mail = models.EmailField(max_length=200, unique=True)
    class PositionChoices(models.TextChoices):
        DOCTOR = "D", _("Doctor")
        NURSE = "N", _("Nurse")
        OTHER = "O", _("Other")
    position = models.CharField(max_length=1, choices=PositionChoices, default=PositionChoices.OTHER)

class Medicine(models.Model):
    name = models.TextField(max_length=200, unique=False)
    expiry = models.DateField(default=date.today)
    imp = models.DateField(default=date.today)
    exp = models.DateField(default=date.today)
    description = models.TextField(max_length=2000, unique=False, default="")


class Device(models.Model):
    name = models.TextField(max_length=200, unique=False)
    class DesChoices(models.TextChoices):
        WORKING  = "W", _("Working")
        MAINTAINING = "M", _("Maintaining")
        NORMAL = "N", _("Normal")
        DAMAGED = "D", _("Damaged")
    description = models.CharField(max_length=1, choices=DesChoices, default=DesChoices.NORMAL)
    available = models.BooleanField(default=False)
    status = models.TextField(max_length=2000, unique=False, default="")

class Schedule(models.Model):
    name = models.TextField(max_length=200, unique=False)
    date = models.DateField(default=datetime.now)
    start = models.TimeField(default=datetime.now)
    end = models.TimeField(default=datetime.now)

class Appointment(models.Model):
    time = models.TimeField(default=datetime.now)
    date = models.DateField(default=datetime.now)
    completed = models.BooleanField(default=False)
    diagnosis = models.TextField(max_length=200, unique=False, default="none")
    patientname = models.TextField(max_length=200, unique=False)
    doctorname = models.TextField(max_length=200, unique=False)
    feestatus = models.BooleanField(default=False)
    class RateChoices(models.TextChoices):
        EXCELLENT  = "E", _("Excellent")
        GOOD = "G", _("Good")
        OK = "O", _("Ok")
        POOR = "P", _("Poor")
        TERRIBLE = "T", _("Terrible")
    rate = models.CharField(max_length=1, choices=RateChoices, default=RateChoices.OK)

class MaintainAndRepair(models.Model):
    date = models.DateField(default=datetime.now)
    class TypeChoices(models.TextChoices):
        MAINTAIN  = "M", _("Maintain")
        REPAIR = "R", _("Repair")
    type = models.CharField(max_length=1, choices=TypeChoices, default=TypeChoices.MAINTAIN)
    detail = models.TextField(max_length=1000, unique=False)
    name = models.TextField(max_length=200, unique=False, default="")