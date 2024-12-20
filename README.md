# Google Calendar でイベントURLをコピーするボタン表示するスクリプト

[Google Calendar](https://calendar.google.com/calendar) では、なぜかイベントのURLをコピーするためのインタフェースが存在しない。

このスクリプトを拡張機能として導入しておくことで、下記画像のようにイベント表示時にリンクをコピーするボタンを表示できる。

<div align="center">

![image](https://github.com/user-attachments/assets/cde84cd8-c2c1-4e96-980f-7d0f11a0cb10)

</div>

## インストール

1. このリポジトリをクローンしてください
2. Google Chrome にて、Chrome 拡張機能設定ページ (`chrome://extensions/`)にアクセスして、右上の「デベロッパーモード」を有効にしてください
3. 「パッケージ化されていない拡張機能を読み込む」をクリックして、このリポジトリをクローンしたディレクトリを選択してください

## オプション
拡張機能のコロン (`:`) をクリックして「オプション」を押下するとオプションページが表示され、下記オプションが設定可能です。
- タイトルも含めてコピーする (デフォルト: `false`)

## アップデート
たまに機能更新するかもしれません。

`git pull` し、Chrome 拡張機能設定ページで更新ボタンをクリックしてください。

<div align="center">

![image](https://github.com/user-attachments/assets/95915b63-7c37-4580-8695-57765752ed7f)

</div>
