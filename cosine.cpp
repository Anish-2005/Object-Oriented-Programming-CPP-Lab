#include <iostream>
#include <cmath>

using namespace std;

long long factorial(int n) {
    long long fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    return fact;
}

double cosine(double x, int n) {
    double result = 1.0;
    bool sign = false;
    
    for (int i = 2; i <= 2 * n; i += 2) {
        double term = pow(x, i) / factorial(i);
        if (sign) {
            result -= term;
        } else {
            result += term;
        }
        sign = !sign;
    }

    return result;
}

int main() {
    double x;
    int n;

    cout << "Enter the value of x (in radians): ";
    cin >> x;
    cout << "Enter the number of terms (positive integer n): ";
    cin >> n;

    double result = cosine(x, n);
    cout << "Cosine of " << x << " using " << n << " terms of the series is: " << result << endl;

    return 0;
}

