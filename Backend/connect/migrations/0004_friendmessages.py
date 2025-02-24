# Generated by Django 5.1.3 on 2025-02-22 18:22

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connect', '0003_friends'),
    ]

    operations = [
        migrations.CreateModel(
            name='FriendMessages',
            fields=[
                ('friend_message_id', models.AutoField(primary_key=True, serialize=False)),
                ('friend_message', models.TextField()),
                ('date', models.DateField(auto_now_add=True)),
                ('chat_name', models.CharField(max_length=30)),
                ('chat_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'friend_messages',
                'ordering': ['date'],
            },
        ),
    ]
