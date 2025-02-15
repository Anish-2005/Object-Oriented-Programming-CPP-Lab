#include <iostream>
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

