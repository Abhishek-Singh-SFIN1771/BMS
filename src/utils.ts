export function LogMethod( target: any, propertyName: string, descriptor: PropertyDescriptor): void 
{
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Method: ${propertyName} | Args:`, args);
    return originalMethod.apply(this, args);
  };
}