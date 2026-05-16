<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Calculator</title>
        <link rel="stylesheet" href="css/index.css">
        <script src="js/index.js"></script>
    </head>
    <body>
        <?php require 'header.php'; ?>
        <main>
            <div id="container">
                <input id="text_field" value="0" readonly> <!-- I wanted type="number" but it doesn't work well!-->

                <button id="nine_button" class = "cBtn">9</button>
                <button id="eight_button" class = "cBtn">8</button>
                <button id="seven_button" class = "cBtn">7</button>
                <button id="six_button" class = "cBtn">6</button>
                <button id="five_button" class = "cBtn">5</button>
                <button id="four_button" class = "cBtn">4</button>
                <button id="three_button" class = "cBtn">3</button>
                <button id="two_button" class = "cBtn">2</button>
                <button id="one_button" class = "cBtn">1</button>
                <button id="zero_button" class = "cBtn">0</button>

                
                <button id="decimal_dot_button" class = "cBtn">.</button>
                <button id="change_sign_button" title="Change sign" class = "cBtn">±</button>
                <button id="clear_all_button" title="Clear" class = "cBtn">⌧</button>
                <button id="clear_entry_button" title="Clear entry" class = "cBtn">⇤</button>
                <button id="delete_symbol_button" title="Delete one symbol" class = "cBtn">⌫</button>
                <button id="divide_button" class = "cBtn">÷</button>
                <button id="multiply_button" class = "cBtn">×</button>
                <button id="minus_button" class = "cBtn">-</button>
                <button id="plus_button" class = "cBtn">+</button>
                <button id="equal_button" class = "cBtn">=</button>

                <div id="dropdown_container">
                    <button id="chosenBtn" class = "cBtn">1/x</button>
                    <button id="toggleBtn" title="Other options" class = "cBtn">▼</button>
                    <div id="dropdown">
                        <!-- I initiallly made it with btn[numper] as a placeholder, but now I feel like it could be big problem to rename them !-->
                        <div class = "dropdown_btn" data-action="btn1">1/x</div>
                        <div class = "dropdown_btn" data-action="btn2">sin(x)</div>
                        <div class = "dropdown_btn" data-action="btn3">cos(x)</div>
                        <div class = "dropdown_btn" data-action="btn4">tan(x)</div>
                        <div class = "dropdown_btn" data-action="btn5">e<sup>x</sup></div>
                        <div class = "dropdown_btn" data-action="btn6">ln(x)</div>
                        <div class = "dropdown_btn" data-action="btn7">√x</div>
                        <div class = "dropdown_btn" data-action="btn8">sin<sup>-1</sup>(x)</div>
                        <div class = "dropdown_btn" data-action="btn9">cos<sup>-1</sup>(x)</div>
                        <div class = "dropdown_btn" data-action="btn10">tan<sup>-1</sup>(x)</div>
                        <div class = "dropdown_btn" data-action="btn11"><sup>x</sup>√y</div>
                        <div class = "dropdown_btn" data-action="btn12">x<sup>y</sup></div>
                        <div class = "dropdown_btn" data-action="btn13">log<sub>x</sub>(y)</div>
                        <div class = "dropdown_btn" data-action="btn14">x!</div>
                    </div>
                </div> 

                <p id = "operation_status" ></p>

            </div>
        </main>
        <?php require 'footer.php'; ?>
    </body>

    <!-- overlaying staff !-->
    <div id="alert">
        <div id="alert_content">
            <p id = "alert_text"></p>
            <button id="close_alert">Ok</button>
        </div>
    </div>

    <div id="overlay"></div>
</html>