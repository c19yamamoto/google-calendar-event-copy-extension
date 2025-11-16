# Google Calendar でイベント URL をコピーする拡張機能

[Google Calendar](https://calendar.google.com/calendar) では、なぜかイベントの URL をコピーするためのインタフェースが存在しない。

本リポジトリを拡張機能として導入しておくことで、下記画像のようにイベント表示時にリンクをコピーするボタンを表示できる。

<div align="center">

<img width="600px" src="https://github.com/user-attachments/assets/cde84cd8-c2c1-4e96-980f-7d0f11a0cb10">

</div>

## インストール

1. [Release](https://github.com/c19yamamoto/google-calendar-event-copy-extension/releases) からダウンロード、もしくはこのリポジトリをクローンしてください
2. Google Chrome にて、Chrome 拡張機能設定ページ (`chrome://extensions/`)にアクセスして、右上の「デベロッパーモード」を有効にしてください
3. 「パッケージ化されていない拡張機能を読み込む」をクリックして、ダウンロード後、解凍したディレクトリを選択してください

## オプション

下記の方法でオプションを設定できます:

1. **拡張機能アイコンをクリック** (推奨): ツールバーの拡張機能アイコンをクリックすると、ポップアップでオプションを変更できます
2. **オプションページから**: 拡張機能のコロン (`:`) をクリックして「オプション」を押下すると、オプションページが表示されます

### 利用可能なオプション

- タイトルも含めてコピーする (デフォルト: `false`)

<div align="center">

<img width="800px" src="https://github.com/user-attachments/assets/b36b61f0-77b4-44ae-91a5-3721d83d81b5">

</div>

## アップデート

たまに機能更新するかもしれません。

`git pull` し、Chrome 拡張機能設定ページ で更新ボタンをクリックしてください。

<div align="center">

![image](https://github.com/user-attachments/assets/95915b63-7c37-4580-8695-57765752ed7f)

</div>
