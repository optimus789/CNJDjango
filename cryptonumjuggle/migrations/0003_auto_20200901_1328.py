# Generated by Django 3.0.3 on 2020-09-01 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cryptonumjuggle', '0002_userdata_counter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='counter',
            field=models.IntegerField(default=0),
        ),
    ]