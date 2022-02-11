<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Top alert");
?>
<style>
    #top-alert {
        background-color: #DE1300;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Roboto, Arial, serif;
        font-size: 14px;
        line-height: 1.3;
        height: 0;
        overflow: hidden;
        transition: height .5s ease-in-out;
        -webkit-transition: height .5s ease-in-out;
    }
    #top-alert.top-alert--show {
        height: 80px;
    }
    .top-alert__content {
        background: url('/markup/top-alert/top-alert-icon.svg') no-repeat center left;
        background-size: 20px;
        padding: 15px 0 15px 45px;
    }
    @media(max-width: 991px) {
        .top-alert__content {
            font-size: 12px;
        }
    }
    @media(max-width: 767px) {
        .top-alert__content {
            padding-left: 30px;
        }
        .top-alert__content div {
            display: none;
        }
        .top-alert__content span {
            display: block;
        }
    }
</style>

<script>
    window.addEventListener('load', () => {
        document.getElementById('top-alert').classList.add('top-alert--show');
    });
</script>

<div id="top-alert">
    <div class="top-alert__content">
        <div>
            В связи с предновогодними распродажами зафиксировано увеличение грузопотока в транспортных компаниях.
        </div>Возможно увеличение сроков доставки до 3-5 дней.
        <span>
            Приносим извинения за неудобства!
        </span>
    </div>
</div>

<div class="container">
    <p>
        Основной контент
    </p>
</div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>