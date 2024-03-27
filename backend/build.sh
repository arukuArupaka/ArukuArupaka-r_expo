set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py collectstatic
python manage.py createsuperuser
python manage.py makemigrations
python manage.py migrate
python manage.py flush --noinput
python manage.py loaddata data.json