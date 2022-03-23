<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Models\User as UserModel;
use App\Models\ActiveUser;

class User extends Controller
{


    public function register(Request $request){
      $validator = Validator::make($request->all(), [
        'name'  => 'required|max:100',
        'email' => 'required|email|unique:users,email|max:100',
        'password' => 'required',
      ]);
      if ($validator->fails()) {
        return response()->json(
          ['errors'=>$validator->errors()],  422
        );
      }
      $user = new UserModel;
      $user->name = $request->name;
      $user->email = $request->email;
      $user->password = Hash::make($request->password);
      $user->save();
       // log the user in the backendsystem
      return $user;
    }



    public function login(Request $request){
      $validator = Validator::make($request->all(), [
        'email' => 'required|email|exists:users,email',
        'password' => 'required',
      ]);
      if ($validator->fails()) {
        return response()->json(
          ['errors'=>$validator->errors()],  422
        );
      }
      if (Auth::guard('web')->attempt($request->only(['email', 'password']))) {
        $user = UserModel::where('email', $request->email)->first();
        return $user;
      }
      $errors['password'][] = ['Incorrect password!'];
      return response()->json(['errors'=>$errors], 422);
    }



    public function logout(Request $request){
        $user = Auth::guard('web')->user();
        config()->set('auth.user', $user);
        return $user;
    }

}
