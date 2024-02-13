起動方法<br>
frontend
  npm install
  npx expo start
  android → shift a
  ios → i

backend

  if(macの場合){
  python3 -m venv venv
  
  source venv/bin/activate 
  
  }else if(windowsの場合){
  	パイソンインストール
  
  	python -m venv venv
  
  ./venv/Scripts/activate
  }

  pip3 install -r requirements.txt

  python3 manage.py runserver
