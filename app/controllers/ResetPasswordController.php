<?php

namespace App\Controller;

use App\Model\UserModel;
use App\Service\DataBuilder;
use Core\View;

class ResetPasswordController {
    use DataBuilder;

    /**
     * генерация нового пароля и запись в БД
     */
    public function change_password()
    {


        $user = $this->get($_GET['id']);
        $data = (array) $user;

        $data['password'] = $this->generate_password();;
        $args = $this->dataBuilder($data);

        $user = new UserModel();
        $user->update($args, $_GET['id']);

        $user = $this->get($_GET['id']);
        View::render('administrator/users/change_password_result.php', ['user' => $user]);
    }
    /**
     * генерация нового пароля
     * @return [type] [description]
     */
    public function generate_password()
    {
        $chars = "qazxswedcvfrtgbnhyujmkiolp1234567890QAZXSWEDCVFRTGBNHYUJMKIOLP";
        $max = 8;
        $size = StrLen($chars) - 1;
        $password = null;
        while($max--) $password .= $chars[rand(0,$size)];

        return $password;
    }

    /**
     * @return void
     */
    public function get($id) : object
    {
        $user = new UserModel();
        return $user->find($id);
    }
}