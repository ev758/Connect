# Generated by Django 5.1.3 on 2025-01-14 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connect', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=150),
        ),
    ]
