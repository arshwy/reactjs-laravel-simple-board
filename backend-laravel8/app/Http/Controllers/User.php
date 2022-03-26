<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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
        return response()->json([
          'errors' => $validator->errors(),
          'status' => 422
        ]);
      }
      $user = new UserModel;
      $user->name = $request->name;
      $user->email = $request->email;
      $user->password = Hash::make($request->password);
      $user->save();
       // log the user in the backendsystem
      $token = $user->createToken('myapptoken')->plainTextToken;
      Auth::loginUsingId($user->id, TRUE);
      return response()->json([
        'user' => $user,
        'token' => $token,
        'status' => 201
      ]);
    }



    public function login(Request $request){
      $validator = Validator::make($request->all(), [
        'email' => 'required|email|exists:users,email',
        'password' => 'required',
      ]);
      if ($validator->fails()) {
        return response()->json([
          'errors' => $validator->errors(),
          'status' => 422
        ]);
      }
      // return('validation passes');
      $user = UserModel::where('email', $request->email)->first();
      if ($user && Hash::check($request->password, $user->password)) {
        $token = $user->createToken('myapptoken')->plainTextToken;
        // Auth::loginUsingId($user->id, TRUE);
        return response()->json([
          'user' => $user,
          'token' => $token,
          'status' => 201
        ]);
      }
      $errors['password'][] = ['Incorrect password!'];
      return response()->json([
        'errors' => $errors,
        'status' => 422
      ]);
    }



    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return "logged out successfully!";
    }

}
