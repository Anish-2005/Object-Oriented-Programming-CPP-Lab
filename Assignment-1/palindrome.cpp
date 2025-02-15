//3.Write a program to find whether a given string is Palindrome or not.


#include<iostream>
using namespace std;

bool isPalindrome(string str)
{
	int left=0,right=str.length()-1;
	while(left<right)
	{
		if(str[left]!=str[right])
		
			return false;
		
		left++;
		right++;
	}
return true;
}
int main(){
	string str;
	cout<<"enter a string";
	cin>>str;
	if(isPalindrome(str)){
		cout<<"is palindrome"<<endl;
	}
	else
		cout<<"is not palindrome"<<endl;
	return 0;
}
