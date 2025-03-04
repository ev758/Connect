# Generated by Django 5.1.3 on 2025-02-25 04:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connect', '0004_friendmessages'),
    ]

    operations = [
        migrations.CreateModel(
            name='ForgotPassword',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=150)),
                ('password_reset_token', models.CharField(max_length=100)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'forgot_password',
            },
        ),
    ]
