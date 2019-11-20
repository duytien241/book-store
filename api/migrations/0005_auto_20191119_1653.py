# Generated by Django 2.2.7 on 2019-11-19 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_book_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='phone',
            field=models.CharField(default=1, max_length=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='book',
            name='description',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='book',
            name='image',
            field=models.ImageField(upload_to='books'),
        ),
        migrations.AlterField(
            model_name='book',
            name='src_image',
            field=models.CharField(blank=True, default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='ship_address',
            field=models.CharField(default='a', max_length=255),
            preserve_default=False,
        ),
    ]
