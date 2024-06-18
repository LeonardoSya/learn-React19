#include <iostream>

void fn(int *value)
{
  std::cout << &value << std::endl;
  (*value)++;
}

int main()
{
  int num = 10;
  std::cout << &num << std::endl;
  std::cout << "before increment:" << num << std::endl;
  fn(&num);
  std::cout << "after increment:" << num << std::endl;
  return 0;
}

