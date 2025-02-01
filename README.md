# Google Calendar でイベント URL をコピーする拡張機能

[Google Calendar](https://calendar.google.com/calendar) では、なぜかイベントの URL をコピーするためのインタフェースが存在しない。

本リポジトリを拡張機能として導入しておくことで、下記画像のようにイベント表示時にリンクをコピーするボタンを表示できる。

<div align="center">

<img width="600px" src="https://github.com/user-attachments/assets/cde84cd8-c2c1-4e96-980f-7d0f11a0cb10">

</div>

## インストール

1. このリポジトリをクローンしてください
2. Google Chrome にて、Chrome 拡張機能設定ページ (`chrome://extensions/`)にアクセスして、右上の「デベロッパーモード」を有効にしてください
3. 「パッケージ化されていない拡張機能を読み込む」をクリックして、このリポジトリをクローンしたディレクトリを選択してください

## オプション

拡張機能のコロン (`:`) をクリックして「オプション」を押下するとオプションページが表示され、下記オプションが設定可能です。

- タイトルも含めてコピーする (デフォルト: `false`)

<div align="center">

<div style="display:flex; justify-content:center; align-items:center; gap:50px;">

<img width="300px" src="https://github.com/user-attachments/assets/a87661c2-d142-44d9-a11a-d72a1be64697">
<span style="font-size: 4em;">→</span>
<img width="400px" height="auto" src="https://github.com/user-attachments/assets/f579f44e-e1ad-4854-85b2-9d313738d847">

</div>

</div>

## アップデート

たまに機能更新するかもしれません。

`git pull` し、Chrome 拡張機能設定ページ で更新ボタンをクリックしてください。

<div align="center">

![image](https://github.com/user-attachments/assets/95915b63-7c37-4580-8695-57765752ed7f)

</div>
