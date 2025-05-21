export function LogMethod(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Method: ${propertyName} | Args:`, args);
        return originalMethod.apply(this, args);
    };
}
