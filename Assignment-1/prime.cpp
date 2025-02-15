#include<iostream>
using namespace std;

bool isPrime(int n)
{
	for(int i=2;i<n;i++)
	{
		if(n%i==0){
		return 0;
		}
	}
	return 1;
}
int main(){
	cout<<"prime number from 1 to 100:\n";
	for(int i=1;i<=100;i++)
	{
		if(isPrime(i)){
			cout<<i<<" ";
		}
	}
	cout<<endl;
	return 0;
}
