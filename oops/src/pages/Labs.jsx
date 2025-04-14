// src/pages/Labs.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCode, 
  FiBookOpen, 
  FiPlus,
  FiHome,
  FiX,
  FiFolder,
  FiActivity,
  FiGrid,
  FiArchive,
  FiBox,
  FiGitlab,
  FiBook,
  FiArrowUp,
  FiArrowDown,
  FiLink,
  FiRefreshCw
} from 'react-icons/fi';

const assignments = [
  {
    title: "Prerequisite Programming",
    icon: <FiBookOpen />,
    problems: [
      {
        question: "Write a program to find Armstrong numbers from 1 to 500",
        code: `#include <iostream>
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
`,
        output: `Armstrong numbers are:
1 2 3 4 5 6 7 8 9 153 370 371 407 `
      },
      {
        question: "Write a program to find Prime numbers from 1 to 100.",
        code: `#include<iostream>
using namespace std;

bool isPrime(int n)
{
	if(n <= 1) return 0;
	for(int i=2; i<n; i++)
	{
		if(n%i == 0)
			return 0;
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
`,
        output: `prime number from 1 to 100:
1 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 `

      },
      {
        question: "Write a program to find whether a given string is Palindrome or not",
        code: `#include<iostream>
using namespace std;

bool isPalindrome(string str)
{
	int left=0,right=str.length()-1;
	while(left<right)
	{
		if(str[left]!=str[right])
		
			return false;
		
		left++;
		right--;
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
`,
        output: `
enter a string: racecar is palindrome

enter a string: hello is not palindrome`
      },
      {
        question: "Write a program to implement matrix transpose.",
        code: `#include <iostream>

using namespace std;

void transposeMatrix(int matrix[][10], int transposed[][10], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            transposed[j][i] = matrix[i][j];
        }
    }
}

void printMatrix(int matrix[][10], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    int rows, cols;
    cout << "Enter number of rows and columns: ";
    cin >> rows >> cols;

    int matrix[10][10], transposed[10][10];

    cout << "Enter matrix elements:\n";
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cin >> matrix[i][j];
        }
    }

    transposeMatrix(matrix, transposed, rows, cols);

    cout << "\nOriginal Matrix:\n";
    printMatrix(matrix, rows, cols);

    cout << "\nTransposed Matrix:\n";
    printMatrix(transposed, cols, rows);

    return 0;
}
`,
        output: `Enter number of rows and columns: 2 3
Enter matrix elements:
1 2 3
4 5 6

Original Matrix:
1 2 3
4 5 6

Transposed Matrix:
1 4
2 5
3 6`
      },
      {
        question: "Write a program to implement matrix multiplication",
        code: `#include <iostream>

using namespace std;

void multiplyMatrices(int A[][10], int B[][10], int result[][10], int r1, int c1, int c2) {
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            result[i][j] = 0;
            for (int k = 0; k < c1; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
}

void printMatrix(int matrix[][10], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    int r1, c1, r2, c2;
    cout << "Enter rows and columns of first matrix: ";
    cin >> r1 >> c1;
    cout << "Enter rows and columns of second matrix: ";
    cin >> r2 >> c2;

    if (c1 != r2) {
        cout << "Matrix multiplication not possible. Columns of first matrix must be equal to rows of second matrix.\n";
        return 0;
    }

    int A[10][10], B[10][10], result[10][10];

    cout << "Enter elements of first matrix:\n";
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c1; j++) {
            cin >> A[i][j];
        }
    }

    cout << "Enter elements of second matrix:\n";
    for (int i = 0; i < r2; i++) {
        for (int j = 0; j < c2; j++) {
            cin >> B[i][j];
        }
    }

    multiplyMatrices(A, B, result, r1, c1, c2);

    cout << "\nResultant Matrix:\n";
    printMatrix(result, r1, c2);

    return 0;
}
`,
        output: `Enter rows and columns of first matrix: 2 3
Enter rows and columns of second matrix: 3 2
Enter elements of first matrix:
1 2 3
4 5 6
Enter elements of second matrix:
7 8
9 10
11 12

Resultant Matrix:
58 64
139 154
`
      }
    ],
    
  },
  {
    title: "Assignment 2",
    icon: <FiActivity />,
    problems: [
      {
        question: `1.Write a program to compute the cosine of x. The user should apply x and a positive integer n. We compute the cosine of x using the series and the computation should use all terms in the series up through the term involving xn.

        cos x=1-x2/2!+x4/4!-x6/6!.....`,
        code: `#include <iostream>
#include <cmath>
using namespace std;

long long factorial(int n) {
    long long fact = 1;
    for (int i = 2; i <= n; i++)
        fact *= i;
    return fact;
}

double computeCos(double x, int n) {
    double result = 0.0;
    for (int i = 0; i <= n; i++) {
        int power = 2 * i;
        double term = pow(x, power) / factorial(power);
        if (i % 2 == 0)
            result += term;
        else
            result -= term;
    }
    return result;
}

int main() {
    double x;
    int n;

    cout << "Enter value of x (in radians): ";
    cin >> x;
    cout << "Enter number of terms (n): ";
    cin >> n;

    double cosValue = computeCos(x, n);
    cout << "cos(" << x << ") ≈ " << cosValue << endl;

    return 0;
}
`,
        output: `Enter value of x (in radians): 1
Enter number of terms (n): 5

Output:

cos(1) ≈ 0.540302`
      },
      {
        question: " Sort an array using insertion sort.",
        code: `#include <iostream>
using namespace std;

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int n;

    cout << "Enter the number of elements in the array: ";
    cin >> n;

    int arr[n];
    cout << "Enter the elements of the array: ";
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    insertionSort(arr, n);
    cout << "Sorted array: ";
    printArray(arr, n);

    return 0;
}

`,
        output: `Enter the number of elements in the array: 5
Enter the elements of the array: 9 3 7 1 5

Sorted array: 1 3 5 7 9
`
      },
      {
        question: "Sort an array using selection sort",
        code: `#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}

void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int n;
    cout << "Enter the number of elements: ";
    cin >> n;
    
    int arr[n];
    cout << "Enter " << n << " elements: ";
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    selectionSort(arr, n);
    
    cout << "Sorted array: ";
    printArray(arr, n);

    return 0;
}

`,
        output: `Enter the number of elements: 6
Enter 6 elements: 64 25 12 22 11 5

Sorted array: 5 11 12 22 25 64
`
      },
      {
        question: ` Implement the following pattern.                  

        1

      212

    32123

  4321234

543212345`,
        code: `#include <iostream>
using namespace std;

class Pattern {
private:
    int n;

public:
    Pattern(int num) { 
        n = num; 
    }

    void printPattern() {
        int width = 2 * n - 1; 

        for (int i = 1; i <= n; i++) {
            int numSpaces = (width - (2 * i - 1)) / 2; 

            for (int j = 0; j < numSpaces; j++) {
                cout << " ";
            }
            for (int j = i; j >= 1; j--) {
                cout << j;
            }
            for (int j = 2; j <= i; j++) {
                cout << j;
            }
            cout << endl;
        }
    }
};

int main() {
    Pattern p(5);
    p.printPattern();
    return 0;
}

`,
        output: `5
        
    1
   212
  32123
 4321234
543212345
`
      },
      {
        question: `Define a class Employee with the following attributes:

name (string)
employee_id (integer)
department (string)
salary (float)
Implement the following methods in the Employee class:
Constructor to initialize employee details.
get_data(): To input employee details.
display_info(): Method to print employee details.
apply_raise(percentage): Method to increase the salary by a given percentage depending on experience`,
        code: `#include <iostream>
#include <string>
using namespace std;

class Employee {
private:
    string name;
    int employee_id;
    string department;
    float salary;

public:
    Employee(string emp_name, int emp_id, string dept, float emp_salary) {
        name = emp_name;
        employee_id = emp_id;
        department = dept;
        salary = emp_salary;
    }

    void get_data() {
        cout << "Enter name: ";
        cin >> name;
        cout << "Enter employee ID: ";
        cin >> employee_id;
        cout << "Enter department: ";
        cin >> department;
        cout << "Enter salary: ";
        cin >> salary;
    }

    void display_info() const {
        cout << "\nEmployee Details:" << endl;
        cout << "Name: " << name << endl;
        cout << "Employee ID: " << employee_id << endl;
        cout << "Department: " << department << endl;
        cout << "Salary: $" << salary << endl;
    }

    void apply_raise(float percentage) {
        salary += (salary * percentage / 100);
    }
};

int main() {
    Employee emp("John Doe", 1001, "HR", 55000);

    emp.display_info();

    float raise_percentage;
    cout << "\nEnter percentage raise: ";
    cin >> raise_percentage;

    emp.apply_raise(raise_percentage);

    cout << "\nUpdated ";
    emp.display_info();

    return 0;
}
`,
        output: `Enter percentage raise: 10
        
Employee Details:
Name: John Doe
Employee ID: 1001
Department: HR
Salary: $55000

Enter percentage raise: 10

Updated Employee Details:
Name: John Doe
Employee ID: 1001
Department: HR
Salary: $60500
`
      }
    ]
  },
  {
    title: "Sorting(Divide And Conquer)",
    icon: <FiArrowUp />,
    problems: [
      {
        question: "WAP in C++ to Sort an array using Merge Sort",
        code: `#include <iostream>

using namespace std;

class MergeSort {
private:
    int* arr;
    int size;

    void merge(int left, int mid, int right);
    void mergeSort(int left, int right);

public:
    MergeSort(int arr[], int size);
    void sort();
    void printArray();
};

MergeSort::MergeSort(int arr[], int size) {
    this->arr = arr;
    this->size = size;
}

void MergeSort::sort() {
    mergeSort(0, size - 1);
}

void MergeSort::mergeSort(int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(left, mid);
        mergeSort(mid + 1, right);
        merge(left, mid, right);
    }
}

void MergeSort::merge(int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int* leftArr = new int[n1];
    int* rightArr = new int[n2];

    for (int i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];

    for (int i = 0; i < n2; i++)
        rightArr[i] = arr[mid + 1 + i];

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }

    delete[] leftArr;
    delete[] rightArr;
}

void MergeSort::printArray() {
    for (int i = 0; i < size; i++)
        cout << arr[i] << " ";
    cout << endl;
}

int main() {
    int size;
    cout << "Enter the number of elements: ";
    cin >> size;

    int* arr = new int[size];

    cout << "Enter " << size << " elements: ";
    for (int i = 0; i < size; i++)
        cin >> arr[i];

    MergeSort sorter(arr, size);

    cout << "Original array: ";
    sorter.printArray();

    sorter.sort();

    cout << "Sorted array: ";
    sorter.printArray();

    delete[] arr;
    return 0;
}`,
        output: `Enter the number of elements: 6
Enter 6 elements: 12 4 8 10 2 6

Original array: 12 4 8 10 2 6 
Sorted array: 2 4 6 8 10 12
`
      },
      {
        question: "WAP in C++ to Sort an array using Quick Sort",
        code: `#include <iostream>

using namespace std;

class QuickSort {
private:
    int* arr;
    int size;

    int partition(int low, int high);

public:
    QuickSort(int arr[], int size);
    void sort();
    void quicksort(int low, int high);
    void printArray();
};

QuickSort::QuickSort(int arr[], int size) {
    this->arr = arr;
    this->size = size;
}

void QuickSort::sort() {
    quicksort(0, size - 1);
}

void QuickSort::quicksort(int low, int high) {
    if (low < high) {
        int pi = partition(low, high);
        quicksort(low, pi - 1);
        quicksort(pi + 1, high);
    }
}

int QuickSort::partition(int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }

    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void QuickSort::printArray() {
    for (int i = 0; i < size; i++)
        cout << arr[i] << " ";
    cout << endl;
}

int main() {
    int size;
    cout << "Enter the number of elements: ";
    cin >> size;

    int* arr = new int[size];

    cout << "Enter " << size << " elements: ";
    for (int i = 0; i < size; i++)
        cin >> arr[i];

    QuickSort sorter(arr, size);

    cout << "Original array: ";
    sorter.printArray();

    sorter.sort();

    cout << "Sorted array: ";
    sorter.printArray();

    delete[] arr;
    return 0;
}`,
        output: `Enter the number of elements: 6
Enter 6 elements: 12 4 8 10 2 6

Original array: 12 4 8 10 2 6 
Sorted array: 2 4 6 8 10 12
`
      }
    ]
  },
  {
    title: "Array",
    icon: <FiArchive />,
    problems: [
      {
        question: `Write a menu driven C++ program with following option 

a. Accept elements of an array 

b. Display elements of an array

c. Sort the array using bubble sort method

Write C++ functions for all options. The functions should have two parameters name of the array and number of elements in the array.`,
        code: `#include <iostream>
using namespace std;

class Menu 
{
	private:
		int* arr;
		int size;

	public:
		Menu(int s) 
		{
		    size = s;
		    arr = new int[size];
		}
		~Menu() 
		{
		    delete[] arr;
		}

		void acceptElements();   
		void displayElements(); 
		void bubbleSort();        
	};
	void Menu::acceptElements() 
	{
		cout << "Enter the elements: ";
		for (int i = 0; i < size; i++) 
		{
		    cin >> arr[i];
		}
	}
	void Menu::displayElements() 
	{
	    cout << "Array elements: ";
		for (int i = 0; i < size; i++) 
		{
		    cout << arr[i] << " ";
		}
		cout << endl;
    }
	void Menu::bubbleSort() 
	{
	   for (int i = 0; i < size - 1; i++)
	    {
		    for (int j = 0; j < size - i - 1; j++) 
		    {
		        if (arr[j] > arr[j+1]) 
		        {
		            swap(arr[j],arr[j+1]);
		        }
		    }
		}
    cout << "Array sorted successfully!" << endl;
    }
int main() 
{
    int size, choice;
    cout << "Enter the number of elements in the array: ";
    cin >> size;
    Menu obj(size);

    do 
    {
        cout << "\nMenu:\n";
        cout << "1. Accept elements\n";
        cout << "2. Display elements\n";
        cout << "3. Sort the array (Bubble Sort)\n";
        cout << "4. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                obj.acceptElements();
                break;
            case 2:
                obj.displayElements();
                break;
            case 3:
                obj.bubbleSort();
                cout << "Sorted ";
                obj.displayElements();
                break;
            case 4:
                cout << "Exiting program...\n";
                break;
            default:
                cout << "Invalid choice, please try again!\n";
        }
    } while (choice != 4);

    return 0;
}
`,
        output: `Enter the number of elements in the array: 5

Menu:
1. Accept elements
2. Display elements
3. Sort the array (Bubble Sort)
4. Exit
Enter your choice: 1
Enter the elements: 34 7 23 12 56

Menu:
1. Accept elements
2. Display elements
3. Sort the array (Bubble Sort)
4. Exit
Enter your choice: 2
Array elements: 34 7 23 12 56 

Menu:
1. Accept elements
2. Display elements
3. Sort the array (Bubble Sort)
4. Exit
Enter your choice: 3
Array sorted successfully!
Sorted Array elements: 7 12 23 34 56 

Menu:
1. Accept elements
2. Display elements
3. Sort the array (Bubble Sort)
4. Exit
Enter your choice: 4
Exiting program...
`
      },
      {
        question: `Given two arrays of integers A and B of sizes M and N respectively. Write a class in C++ with a function MIX () with three arguments, which will produce a third array named C such that the following sequence is followed. 

All even numbers of A from left to right are copied into C from left to right. 

All odd numbers of A from left to right are copied into C from right to left. 

All even numbers of B from left to right are copied into C from left to right. 

All old numbers of B from left to right are copied into C from right to left.

A, B and C are passed as arguments to MIX (). e.g., A is {3, 2, 1, 7, 6, 3} and B is {9, 3, 5, 6, 2, 8, 10} the resultant array C is {2, 6, 6, 2, 8, 10, 5, 3, 9, 3, 7, 1, 3}`,
        code: `#include <iostream>
using namespace std;

class ArrayMixer {
private:
    int* C;
    int size;

public:
    ArrayMixer(int M, int N) {
        size = M + N;
        C = new int[size];
    }

    void MIX(int A[], int B[], int M, int N);
    void display();
    
    ~ArrayMixer() {
        delete[] C;
    }
};

void ArrayMixer::MIX(int A[], int B[], int M, int N) {
    int left = 0, right = size - 1;

    for (int i = 0; i < M; i++) {
        if (A[i] % 2 == 0) {
            C[left++] = A[i];
        }
    }
    for (int i = 0; i < M; i++) {
        if (A[i] % 2 != 0) {
            C[right--] = A[i];
        }
    }
    for (int i = 0; i < N; i++) {
        if (B[i] % 2 == 0) {
            C[left++] = B[i];
        }
    }
    for (int i = 0; i < N; i++) {
        if (B[i] % 2 != 0) {
            C[right--] = B[i];
        }
    }
}

void ArrayMixer::display() {
    cout << "Resultant array C: ";
    for (int i = 0; i < size; i++) {
        cout << C[i] << " ";
    }
    cout << endl;
}

int main() {
    int M, N;

    cout << "Enter the size of array A: ";
    cin >> M;
    int A[M];
    cout << "Enter elements of array A: ";
    for (int i = 0; i < M; i++) {
        cin >> A[i];
    }

    cout << "Enter the size of array B: ";
    cin >> N;
    int B[N];
    cout << "Enter elements of array B: ";
    for (int i = 0; i < N; i++) {
        cin >> B[i];
    }

    ArrayMixer obj(M, N);
    obj.MIX(A, B, M, N);
    obj.display();

    return 0;
}
`,
        output: `Enter the size of array A: 5
Enter elements of array A: 1 2 3 4 5
Enter the size of array B: 4
Enter elements of array B: 6 7 8 9
Resultant array C: 2 4 6 8 1 3 5 7 9 
`
      }
    ]
  },
  {
    title: "Concept of Constructor and Inheritance",
    icon: <FiLink />,
    problems: [
      {
        question: "Write a program to pass three different data type argument through constructor and store to copy constructor and finally destroy it",
        code: `#include <iostream>
#include <cstring>
using namespace std;

class ThreePass 
{
private:
    int ivalue;
    float fvalue;
    char* svalue;

public:
    ThreePass(int i, float f, const char* s) 
    {
        ivalue = i;
        fvalue = f;
        svalue = new char[strlen(s) + 1];
        strcpy(svalue, s);
        cout << "Constructor called!" << endl;
    }

    ThreePass(const ThreePass &obj) 
    {
        ivalue = obj.ivalue;
        fvalue = obj.fvalue;
        svalue = new char[strlen(obj.svalue) + 1];
        strcpy(svalue, obj.svalue);
        cout << "Copy Constructor called!" << endl;
    }

    void display() 
    {
        cout << "Integer: " << ivalue << ", Float: " << fvalue << ", String: " << svalue << endl;
    }

    ~ThreePass() 
    {
        delete[] svalue;
        cout << "Destructor called!" << endl;
    }
};

int main() 
{
    int i;
    float f;
    char str[100];

    cout << "Enter an integer: ";
    cin >> i;
    cout << "Enter a float: ";
    cin >> f;
    cin.ignore();
    cout << "Enter a string: ";
    cin.getline(str, 100);

    ThreePass obj1(i, f, str);
    obj1.display();

    ThreePass obj2 = obj1;
    obj2.display();

    return 0;
}
`,
        output: `Enter an integer: 5
Enter a float: 3.14
Enter a string: Hello World
Constructor called!
Integer: 5, Float: 3.14, String: Hello World
Copy Constructor called!
Integer: 5, Float: 3.14, String: Hello World
Destructor called!
Destructor called!
`
      },
      {
        question: "Implement multiple Inheritance through getter method",
        code: `#include <iostream>

using namespace std;

class Base1 
{
	protected:
		int value1;
	public:
		Base1(int v1) 
		{
		    value1 = v1;
		    cout << "Base1 Constructor called" << endl;
		}
		int getValue1() const 
		{
		    return value1;
		}
		~Base1() 
		{
		    cout << "Base1 Destructor called" << endl;
		}
};
class Base2 
{
	protected:
		int value2;
	public:
		Base2(int v2) 
		{
		    value2 = v2;
		    cout << "Base2 Constructor called" << endl;
		}
		int getValue2() const 
		{
		    return value2;
		}
		~Base2() 
		{
		    cout << "Base2 Destructor called" << endl;
		}
};
class Derived : public Base1, public Base2 
{
	public:
		Derived(int v1, int v2) : Base1(v1), Base2(v2) 
		{
		    cout << "Derived Constructor called" << endl;
		}
		void displayValues() const 
		{
		    cout << "Value from Base1: " << getValue1() << endl;
		    cout << "Value from Base2: " << getValue2() << endl;
		}
		~Derived() 
		{
		    cout << "Derived Destructor called" << endl;
		}
};
int main() 
{
    int num1, num2;
    cout << "Enter value for Base1: ";
    cin >> num1;
    cout << "Enter value for Base2: ";
    cin >> num2;
    Derived obj(num1, num2);
    obj.displayValues();
    return 0;
}`,
        output: `Enter value for Base1: 10
Enter value for Base2: 20
Base1 Constructor called
Base2 Constructor called
Derived Constructor called
Value from Base1: 10
Value from Base2: 20
Derived Destructor called
Base2 Destructor called
Base1 Destructor called
`
      },
      {
        question: "Write a program to implement single Inheritance with attribute and method",
        code: `#include <iostream>
using namespace std;

class Animal {
protected:
    string name;
    
public:
    Animal(string n) {
        name = n;
    }

    void displayName() {
        cout << "Animal Name: " << name << endl;
    }
};

class Dog : public Animal {
private:
    string breed;
    
public:
    Dog(string n, string b) : Animal(n) {
        breed = b;
    }

    void displayBreed() {
        cout << "Dog Breed: " << breed << endl;
    }
};

int main() {
    Dog dog1("Buddy", "Golden Retriever");
    
    dog1.displayName();
    dog1.displayBreed();

    return 0;
}
`,
        output: `Animal Name: Buddy
Dog Breed: Golden Retriever
`
      },
      {
        question: " Implement Hybrid Inheritance",
        code: `#include <iostream>
using namespace std;

class Animal {
protected:
    string name;
    
public:
    Animal(string n) {
        name = n;
    }

    void displayName() {
        cout << "Animal Name: " << name << endl;
    }
};

class Bird {
protected:
    int wingspan;

public:
    Bird(int w) {
        wingspan = w;
    }

    void displayWingspan() {
        cout << "Wingspan: " << wingspan << " cm" << endl;
    }
};

class Eagle : public Animal, public Bird {
private:
    string type;

public:
    Eagle(string n, int w, string t) : Animal(n), Bird(w) {
        type = t;
    }

    void displayDetails() {
        displayName();
        displayWingspan();
        cout << "Type of Eagle: " << type << endl;
    }
};

int main() {
    Eagle eagle1("Golden Eagle", 220, "Golden");

    eagle1.displayDetails();

    return 0;
}
`,
        output: `Animal Name: Golden Eagle
Wingspan: 220 cm
Type of Eagle: Golden
`
      }
    ]
  },
  {
    title: "Polymorphism",
    icon: <FiGrid />,
    problems: [
      {
        question: "Write a program  in C++ to implement Compile Time Polymorphism with function Overloading.",
        code: `#include <iostream>
using namespace std;

class Add {
public:
    int sum(int a, int b) {
        return a + b;
    }

    float sum(float a, float b) {
        return a + b;
    }

    double sum(double a, double b) {
        return a + b;
    }
};

int main() {
    Add obj;

    cout << "Sum of 3 and 5 (int): " << obj.sum(3, 5) << endl;
    cout << "Sum of 3.5 and 4.5 (float): " << obj.sum(3.5f, 4.5f) << endl;
    cout << "Sum of 3.5 and 4.5 (double): " << obj.sum(3.5, 4.5) << endl;

    return 0;
}
`,
        output: `Sum of 3 and 5 (int): 8
Sum of 3.5 and 4.5 (float): 8
Sum of 3.5 and 4.5 (double): 8
`
      },
      {
        question: "Write a program  in C++ to implement all the Ambiguous conditions of function Overloading",
        code: `#include <iostream>
using namespace std;

class Demo {
public:
    void fun(int x) {
        cout << "fun(int): " << x << endl;
    }

    void fun(double x) {
        cout << "fun(double): " << x << endl;
    }

    void fun(float x) {
        cout << "fun(float): " << x << endl;
    }

    void fun(char x) {
        cout << "fun(char): " << x << endl;
    }
};

int main() {
    Demo d;

    d.fun(5);
    d.fun(3.14);
    d.fun(3.14f);
    d.fun('A');

    short s = 10;
    // The below line will cause ambiguity error
    // d.fun(s);

    return 0;
}
`,
        output: `fun(int): 5
fun(double): 3.14
fun(float): 3.14
fun(char): A
`
      },
      {
        question: "Write a program in C++ to implement Operator Overloading",
        code: `#include <iostream>
using namespace std;

class Complex {
private:
    float real;
    float imag;

public:
    Complex(float r = 0, float i = 0) {
        real = r;
        imag = i;
    }

    Complex operator + (const Complex& obj) {
        Complex result;
        result.real = real + obj.real;
        result.imag = imag + obj.imag;
        return result;
    }

    void display() {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main() {
    Complex c1(3.5, 2.5), c2(1.5, 4.5), c3;
    c3 = c1 + c2;
    c3.display();
    return 0;
}
`,
        output: `5 + 7i
`
      },
      {
        question: "Write a program  in C++ to implement Run Time Polymorphism for Attribute and function",
        code: `#include <iostream>
using namespace std;

class Animal {
public:
    string name;

    virtual void speak() {
        cout << name << " makes a sound." << endl;
    }
};

class Dog : public Animal {
public:
    Dog() {
        name = "Dog";
    }

    void speak() override {
        cout << name << " barks." << endl;
    }
};

class Cat : public Animal {
public:
    Cat() {
        name = "Cat";
    }

    void speak() override {
        cout << name << " meows." << endl;
    }
};

int main() {
    Animal* ptr;

    Dog d;
    Cat c;

    ptr = &d;
    ptr->speak();

    ptr = &c;
    ptr->speak();

    return 0;
}
`,
        output: `Dog barks.
Cat meows.
`
      },
      {
        question: "Write a program  in C++ to implement Ambiguous condition for Overriding",
        code: `#include <iostream>
using namespace std;

class A {
public:
    void show() {
        cout << "Class A show()" << endl;
    }
};

class B {
public:
    void show() {
        cout << "Class B show()" << endl;
    }
};

class C : public A, public B {
public:
    void showA() {
        A::show();
    }

    void showB() {
        B::show();
    }
};

int main() {
    C obj;

    // obj.show(); // This would cause ambiguity

    obj.showA();
    obj.showB();

    return 0;
}
`,
        output: `Class A show()
Class B show()
`
      }
    ]
  },
  {
    title: " Virtual Function",
    icon: <FiRefreshCw />,
    problems: [
      {
        question: `1. Create a base class Shape having a virtual function area() and a virtual function perimeter() that return the area of the shape and perimeter of the shape respectively.

Create 3 derived classes – Rectangle, Circle and Triangle having appropriate member variables, constructors and destructors. Redefine the above functions accordingly.

Create an array of pointers to Shape objects in the main(). Store instances of Rectangle, Circle, and Triangle in this array using dynamic memory allocation. For each object, call the area() and perimeter() functions using the base class pointer.

a) The area and perimeter of an equilateral triangle : and 

b) Isosceles Triangle:  and 

c) Scalene Triangle:`,
        code: `#include <iostream>
#include <cmath>
using namespace std;

class Shape {
public:
    virtual float area() const = 0;
    virtual float perimeter() const = 0;
    virtual ~Shape() {}
};

class Rectangle : public Shape {
    float length, breadth;
public:
    Rectangle(float l, float b) : length(l), breadth(b) {}
    float area() const override {
        return length * breadth;
    }
    float perimeter() const override {
        return 2 * (length + breadth);
    }
};

class Circle : public Shape {
    float radius;
    const float pi = 3.14159;
public:
    Circle(float r) : radius(r) {}
    float area() const override {
        return pi * radius * radius;
    }
    float perimeter() const override {
        return 2 * pi * radius;
    }
};

class Triangle : public Shape {
protected:
    float a, b, c;
public:
    Triangle(float x, float y, float z) : a(x), b(y), c(z) {}

    float perimeter() const override {
        return a + b + c;
    }

    float area() const override {
        float s = perimeter() / 2;
        return sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula
    }
};

int main() {
    Shape* shapes[5];

    shapes[0] = new Rectangle(5, 3);
    shapes[1] = new Circle(4);
    shapes[2] = new Triangle(5, 5, 5);  // Equilateral
    shapes[3] = new Triangle(6, 6, 4);  // Isosceles
    shapes[4] = new Triangle(5, 6, 7);  // Scalene

    for (int i = 0; i < 5; i++) {
        cout << "Shape " << i + 1 << ":\n";
        cout << "Area = " << shapes[i]->area() << endl;
        cout << "Perimeter = " << shapes[i]->perimeter() << endl << endl;
    }

    for (int i = 0; i < 5; i++) {
        delete shapes[i];
    }

    return 0;
}
`,
        output: `Shape 1:
Area = 15
Perimeter = 16

Shape 2:
Area = 50.2654
Perimeter = 25.1327

Shape 3:
Area = 10.8253
Perimeter = 15

Shape 4:
Area = 11.6189
Perimeter = 16

Shape 5:
Area = 14.6969
Perimeter = 18
`
      },
      {
        question: "Write a program to implement pure virtual function to achieve Data Abstraction",
        code: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual void display() = 0; 
};

class Square : public Shape {
    float side;
public:
    Square(float s) : side(s) {}
    void display() override {
        cout << "Square Area: " << side * side << endl;
    }
};

class Circle : public Shape {
    float radius;
    const float pi = 3.14159;
public:
    Circle(float r) : radius(r) {}
    void display() override {
        cout << "Circle Area: " << pi * radius * radius << endl;
    }
};

int main() {
    Shape* shape1 = new Square(4);
    Shape* shape2 = new Circle(3.5);

    shape1->display();
    shape2->display();

    delete shape1;
    delete shape2;

    return 0;
}
`,
        output: `Square Area: 16
Circle Area: 38.4845
`
      },
      {
        question: "Write a program to implement Inline Function",
        code: `#include <iostream>
using namespace std;

class Math {
public:
    inline int square(int x) {
        return x * x;
    }

    inline int cube(int x) {
        return x * x * x;
    }
};

int main() {
    Math m;
    int num;

    cout << "Enter a number: ";
    cin >> num;

    cout << "Square of " << num << " is: " << m.square(num) << endl;
    cout << "Cube of " << num << " is: " << m.cube(num) << endl;

    return 0;
}
`,
        output: `Enter a number: 5
Square of 5 is: 25
Cube of 5 is: 125
`
      },
      {
        question: "Write a program to implement the following structure using Pure Virtual Function",
        code: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual void draw() = 0;

    virtual ~Shape() {
        cout << "Shape Destructor" << endl;
    }
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "Drawing a Circle" << endl;
    }

    ~Circle() {
        cout << "Circle Destructor" << endl;
    }
};

class Rectangle : public Shape {
public:
    void draw() override {
        cout << "Drawing a Rectangle" << endl;
    }

    ~Rectangle() {
        cout << "Rectangle Destructor" << endl;
    }
};

int main() {
    Shape* shape1 = new Circle();
    Shape* shape2 = new Rectangle();

    shape1->draw();
    shape2->draw();

    delete shape1;
    delete shape2;

    return 0;
}
`,
        output: `Drawing a Circle
Drawing a Rectangle
Rectangle Destructor
Circle Destructor
Shape Destructor
`
      },
      
    ]
  },
  {
    title: "Templates",
    icon: <FiFolder />,
    problems: [
      {
        question: "Create a generic Array class template",
        code: `template <typename T>
class Array {
  private:
    T *data;
    int size;
  
  public:
    Array(int s) : size(s) { data = new T[size]; }
    ~Array() { delete[] data; }
};`,
        output: "Array of size 5 created"
      }
    ]
  },
  {
    title: "Templates",
    icon: <FiFolder />,
    problems: [
      {
        question: "Create a generic Array class template",
        code: `template <typename T>
class Array {
  private:
    T *data;
    int size;
  
  public:
    Array(int s) : size(s) { data = new T[size]; }
    ~Array() { delete[] data; }
};`,
        output: "Array of size 5 created"
      }
    ]
  },
  
];

export default function LabsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCardClick = (assignment) => {
    setSelectedAssignment(assignment);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => setSelectedAssignment(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-400 rounded-full"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gray-900/90 backdrop-blur-lg border-b border-gray-700/50 p-4 sticky top-0 z-50"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center group">
              <div className="p-2 mr-3 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300 shadow-lg">
                <FiCode className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200 tracking-tight">
                OOP C++ Labs
              </h1>
            </Link>
          </motion.div>

          <div className="flex space-x-4">
          <motion.div 
            whileHover={{ y: -2 }}
            className="flex gap-4"
          >
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700/90 text-gray-100 transition-all duration-300 border border-gray-700 flex items-center gap-2 text-sm"
            >
                 <FiHome className="text-blue-400" />
              Home
            </Link>
            <Link
              to="/compile"
              className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700/90 text-gray-100 transition-all duration-300 border border-gray-700 flex items-center gap-2 text-sm"
            >
                <FiCode className="text-blue-400" />
              Compiler
            </Link>
            <Link
              to="/learn"
              className="px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700/90 text-gray-100 transition-all duration-300 border border-gray-700 flex items-center gap-2 text-sm"
            >
                <FiBook className="text-blue-400" />
              Learn
            </Link>
          </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto py-16 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
            <FiBookOpen className="inline-block mr-4" />
            Lab Assignments
          </h1>
          <p className="text-blue-200 text-lg">Click on any lab to view detailed instructions and code examples</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment, index) => (
            <motion.div
              key={index}
              className="cursor-pointer"
              onClick={() => handleCardClick(assignment)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-blue-900/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20 h-full">
                <div className="text-4xl mb-4 text-cyan-400">
                  {assignment.icon}
                </div>
                <h3 className="text-2xl font-semibold text-blue-100">
                  {assignment.title}
                </h3>
                <div className="mt-4">
                  <span className="text-blue-300 text-sm">
                    {assignment.problems.length} {assignment.problems.length > 1 ? 'Problems' : 'Problem'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popup Overlay */}
        <AnimatePresence>
          {isPopupOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 backdrop-blur-md bg-black/50 flex items-center justify-center"
              onClick={closePopup}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-800/90 backdrop-blur-xl rounded-xl border border-cyan-400/30 w-[110vw] max-w-4xl max-h-[78vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 relative">
                  <button
                    onClick={closePopup}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-700/50 transition-colors"
                  >
                    <FiX className="text-xl text-cyan-400" />
                  </button>

                  {selectedAssignment && (
                    <>
                      <div className="flex items-center mb-8">
                        <div className="text-4xl text-cyan-400 mr-4">
                          {selectedAssignment.icon}
                        </div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
                          {selectedAssignment.title}
                        </h2>
                      </div>

                      <div className="space-y-8">
                        {selectedAssignment.problems.map((problem, pIndex) => (
                          <div key={pIndex} className="bg-gray-700/30 p-6 rounded-xl">
                            <h4 className="text-xl font-medium text-blue-100 mb-6">
                              {problem.question}
                            </h4>
                            
                            <div className="bg-gray-900/80 rounded-xl overflow-hidden mb-6">
                              <div className="flex items-center bg-gray-800 px-4 py-3">
                                <div className="flex space-x-2 mr-3">
                                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-sm text-gray-400">solution.cpp</div>
                              </div>
                              <pre className="p-6 text-sm text-green-300 font-mono overflow-x-auto">
                                {problem.code}
                              </pre>
                            </div>

                            <div className="bg-gray-900/80 p-6 rounded-xl">
                              <span className="text-blue-200 text-sm font-medium">Output:</span>
                              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap mt-4">
                                {problem.output}
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

       
      </div>

      {/* Footer */}
      <motion.footer 
        className="bg-blue-900/80 backdrop-blur-md py-12 relative z-10 mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200">
            © {new Date().getFullYear()} OOP with C++ Lab Repository | Master Object-Oriented Programming Concepts
          </p>
        </div>
      </motion.footer>
    </div>
  );
}