import MaskInput from "mask-input";
import { validate } from "../content/validate";

var buttonAuth = document.getElementById("enterToAccount");
if (buttonAuth) {
    buttonAuth.onclick = function() {
        Swal.fire({
            title: 'Войти в аккаунт',
            html:
                '<input id="phone" type="text" class="auth-field input-selector" placeholder="Номер телефона">' +
                '<input id="password" type="text" class="auth-field" placeholder="Пароль">',
            preConfirm: () => {
                return [
                    document.getElementById('phone').value,
                    document.getElementById('password').value
                ]
            },
            backdrop: `
            rgba(18,97,199,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
            showConfirmButton: true,
            showDenyButton: true,
            background: 'linear-gradient(135deg, #dfe9f3 10%, #ffffff 100%)',
            confirmButtonColor: '#0C57C7',
            confirmButtonText: 'Войти',
            denyButtonText: 'или зарегестрироваться'
        }).then((result) => {
            console.log(result.isConfirmed);
            if (result.isConfirmed && validate()) {
                Swal.fire(
                    'Вы успешно вошли',
                    '',
                    'success'
                )
            }else if (result.isDenied) {
                Swal.fire({
                    title: 'Зарегестрироваться',
                    html:
                        '<input id="phone" type="text" class="auth-field input-selector" placeholder="Номер телефона">' +
                        '<input id="password" type="text" class="auth-field" placeholder="Пароль">',
                    preConfirm: () => {
                        return [
                            document.getElementById('phone').value,
                            document.getElementById('password').value
                        ]
                    },
                    background: 'linear-gradient(135deg, #dfe9f3 10%, #ffffff 100%)',
                    showConfirmButton: true,
                    confirmButtonColor: '#0C57C7',
                    confirmButtonText: 'Зарегестрироваться',
                }).then((result1) => {
                    if (result1.isConfirmed) {
                        Swal.fire(
                            'Вы успешно зарегестрировались',
                            '',
                            'success'
                        )
                    }
                })
            }
        })
        new MaskInput(document.querySelector('.input-selector'), {
            mask: '+(000)-000-00-00',
            alwaysShowMask: true,
            maskChar: '_',
        });
    };
}

