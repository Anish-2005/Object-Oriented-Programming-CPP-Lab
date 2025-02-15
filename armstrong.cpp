#include <iostream>
#include <cmath>
using namespace std;

bool isArmstrong(int n)
{
	int a=0,s=0,t=n;
	while(t>0)
	{
		t=t/10;
		a++;
	}
	t=n;	
	while(t>0)
	{
		int digit=t%10;
		s=s+pow(digit,a);
		t=t/10;
	}
	return s==n;
}

int main()
{
	cout<<"Armstrong numbers are:\n";
	for(int i=1;i<=500;i++)
	{
		if(isArmstrong(i))
		{
			cout<<i<<" ";
		}
	}
	cout<<endl;
	return 0;
}

	


